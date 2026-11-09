import { useState } from 'preact/hooks';
import { Icon } from '../../components/Icon';
import { PageHead } from '../../components/PageHead';
import { JOURNAL_PROMPTS, MOODS } from '../../content/strings-tools';
import { lang, t, tl } from '../../lib/i18n';
import { haptic } from '../../lib/share';
import { state, update, type JournalEntry } from '../../lib/store';

const fmt = (iso: string) =>
  new Date(iso).toLocaleString(lang.value === 'ur' ? 'ur-PK' : 'en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  });

function Editor({ entry, onClose }: { entry?: JournalEntry; onClose: () => void }) {
  const [text, setText] = useState(entry?.text ?? '');
  const [mood, setMood] = useState(entry?.mood);
  const [pi, setPi] = useState(() => Math.floor(Math.random() * JOURNAL_PROMPTS.length));
  const promptText = entry?.prompt ?? tl(JOURNAL_PROMPTS[pi]);

  const save = () => {
    if (!text.trim()) return onClose();
    update((d) => {
      if (entry) {
        const e = d.journal.find((x) => x.id === entry.id);
        if (e) Object.assign(e, { text: text.trim(), mood });
      } else {
        d.journal.unshift({
          id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
          at: new Date().toISOString(),
          mood,
          prompt: promptText,
          text: text.trim(),
        });
      }
    });
    haptic(15);
    onClose();
  };

  return (
    <div class="card editor">
      {!entry && (
        <div class="prompt">
          <span class="mini-label">{t('promptLabel')}</span>
          <p class="prompt-text">{promptText}</p>
          <button class="btn-ghost sm" onClick={() => setPi((pi + 1) % JOURNAL_PROMPTS.length)}>
            <Icon name="refresh" size={15} />
            {t('anotherPrompt')}
          </button>
        </div>
      )}
      <span class="mini-label">{t('howFeeling')}</span>
      <div class="moods">
        {MOODS.map((m) => (
          <button key={m.id} class={`mood ${mood === m.id ? 'on' : ''}`} aria-pressed={mood === m.id}
            onClick={() => setMood(mood === m.id ? undefined : m.id)}>
            <span aria-hidden="true">{m.emoji}</span>
            {tl(m.name)}
          </button>
        ))}
      </div>
      <textarea class="input textarea" rows={6} placeholder={t('writeHere')} value={text} onInput={(e) => setText(e.currentTarget.value)}
        dir="auto" />
      <div class="editor-actions">
        <button class="btn-ghost" onClick={onClose}>
          {t('cancel')}
        </button>
        <button class="btn-primary" onClick={save}>
          {t('save')}
        </button>
      </div>
    </div>
  );
}

function exportAll(entries: JournalEntry[]) {
  const body = entries
    .map((e) => {
      const m = MOODS.find((x) => x.id === e.mood);
      return `${fmt(e.at)}${m ? ` · ${m.emoji} ${tl(m.name)}` : ''}\n${e.prompt ? `“${e.prompt}”\n` : ''}\n${e.text}\n`;
    })
    .join('\n* * *\n\n');
  const blob = new Blob([`Dar-e-Nijaat · ${t('toolJournal')}\n\n${body}`], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `dar-e-nijaat-journal-${new Date().toISOString().slice(0, 10)}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export function Journal() {
  const entries = state.value.journal;
  const [editing, setEditing] = useState<string | 'new' | null>(entries.length ? null : 'new');

  return (
    <div class="screen tool">
      <section class="block top">
        <PageHead label={t('toolsLabel')} title={t('toolJournal')} sub={t('journalSub')} />

        {editing === 'new' ? (
          <Editor onClose={() => setEditing(null)} />
        ) : (
          <button class="btn-primary wide first" onClick={() => setEditing('new')}>
            <Icon name="plus" size={18} />
            {t('newEntry')}
          </button>
        )}

        {entries.length === 0 && editing !== 'new' && <p class="empty">{t('emptyJournal')}</p>}

        <div class="entries">
          {entries.map((e) =>
            editing === e.id ? (
              <Editor key={e.id} entry={e} onClose={() => setEditing(null)} />
            ) : (
              <article key={e.id} class="card entry">
                <header>
                  <span class="entry-date">{fmt(e.at)}</span>
                  {e.mood && <span class="entry-mood">{MOODS.find((m) => m.id === e.mood)?.emoji}</span>}
                </header>
                {e.prompt && <p class="entry-prompt">{e.prompt}</p>}
                <p class="entry-text" dir="auto">
                  {e.text}
                </p>
                <footer>
                  <button class="link" onClick={() => setEditing(e.id)}>
                    {t('edit')}
                  </button>
                  <button class="link danger" onClick={() => confirm(t('deleteConfirm')) && update((d) => void (d.journal = d.journal.filter((x) => x.id !== e.id)))}>
                    {t('delete')}
                  </button>
                </footer>
              </article>
            ),
          )}
        </div>

        {entries.length > 0 && (
          <div class="journal-foot">
            <span class="chip">{t('entries', { n: entries.length })}</span>
            <button class="btn-ghost" onClick={() => exportAll(entries)}>
              <Icon name="download" size={16} />
              {t('exportJournal')}
            </button>
          </div>
        )}
        <p class="fineprint">
          <Icon name="shield" size={14} /> {t('privacyBody')}
        </p>
      </section>
    </div>
  );
}
