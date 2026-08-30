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

  const greeting = t("chat.greeting", language);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isSending]);

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
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="mb-4 flex h-[520px] w-[360px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-md border border-border bg-card shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3">
                <div>
                  <p className="font-serif text-base text-primary-foreground">{t("chat.headerTitle", language)}</p>
                  <p className="text-[11px] text-primary-foreground/70">{t("chat.headerSubtitle", language)}</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label={t("chat.closeLabel", language)}
                  className="rounded-sm p-1 text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
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
                      <Loader2 className="h-3 w-3 animate-spin" />
                      {t("chat.thinking", language)}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-end gap-2 border-t border-border p-3">
                <Textarea
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
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? t("chat.closeLabel", language) : t("chat.openLabel", language)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </motion.button>
      </div>
    </>
  );
}
