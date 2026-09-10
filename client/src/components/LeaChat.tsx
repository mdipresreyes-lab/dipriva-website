import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/i18n/translations";

const CHAT_ENDPOINT = "https://dipriva-chat.dipriva.workers.dev";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

/**
 * Lea, Dipriva's AI Executive Liaison. Replaces the GoHighLevel chat
 * widget with an in-house one talking to the dipriva-chat Cloudflare
 * Worker. The opening greeting is shown locally (no API call) so the
 * widget costs nothing to render; it's included as the first assistant
 * turn once the visitor actually sends a message, so Lea has it as context.
 */
export function LeaChat() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const greeting = t("chat.greeting", language);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isSending]);

  // Focus management and focus trap when dialog is open
  useEffect(() => {
    if (!isOpen) return;

    // Move focus into the dialog
    textareaRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      // Close on Escape and return focus to toggle button
      if (e.key === "Escape") {
        setIsOpen(false);
        toggleBtnRef.current?.focus();
        return;
      }

      // Trap Tab within the dialog
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), textarea:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const closeDialog = () => {
    setIsOpen(false);
    toggleBtnRef.current?.focus();
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const history: ChatMessage[] =
      messages.length === 0 ? [{ role: "assistant", content: greeting }] : messages;
    const nextMessages: ChatMessage[] = [...history, { role: "user", content: trimmed }];

    setMessages(nextMessages);
    setInput("");
    setIsSending(true);

    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = (await response.json()) as { reply?: string };
      setMessages([...nextMessages, { role: "assistant", content: data.reply || t("chat.errorFallback", language) }]);
    } catch {
      setMessages([...nextMessages, { role: "assistant", content: t("chat.errorFallback", language) }]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const displayMessages = messages.length === 0 ? [{ role: "assistant" as const, content: greeting }] : messages;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="lea-dialog-title"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="mb-4 flex h-[520px] w-[360px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-md border border-border bg-card shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3">
                <div>
                  <p id="lea-dialog-title" className="font-serif text-base text-primary-foreground">
                    {t("chat.headerTitle", language)}
                  </p>
                  <p className="text-[11px] text-primary-foreground/70">{t("chat.headerSubtitle", language)}</p>
                </div>
                <button
                  onClick={closeDialog}
                  aria-label={t("chat.closeLabel", language)}
                  className="rounded-sm p-1 text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {/* aria-live so screen readers announce incoming AI replies */}
              <div
                ref={scrollRef}
                aria-live="polite"
                aria-atomic="false"
                aria-label={language === "en" ? "Chat messages" : "Mensajes de chat"}
                className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
              >
                {displayMessages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-md px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isSending && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2 rounded-md bg-secondary px-3 py-2 text-xs text-muted-foreground">
                      <Loader2
                        className="h-3 w-3 animate-spin"
                        role="status"
                        aria-label={language === "en" ? "Loading response" : "Cargando respuesta"}
                      />
                      {t("chat.thinking", language)}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-end gap-2 border-t border-border p-3">
                <Textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t("chat.placeholder", language)}
                  rows={1}
                  className="max-h-24 min-h-9 flex-1 resize-none rounded-sm text-sm"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isSending}
                  size="icon"
                  className="h-9 w-9 shrink-0 rounded-sm"
                  aria-label={t("chat.sendLabel", language)}
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          ref={toggleBtnRef}
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? t("chat.closeLabel", language) : t("chat.openLabel", language)}
          aria-expanded={isOpen}
          aria-controls="lea-dialog"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
        >
          {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <MessageCircle className="h-6 w-6" aria-hidden="true" />}
        </motion.button>
      </div>
    </>
  );
}
