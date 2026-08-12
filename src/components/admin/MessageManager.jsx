import { useEffect, useState } from "react";
import {
  deleteMessage,
  getMessages,
  markMessageAsRead,
} from "../../services/messageService";

const MessageManager = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] =
    useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMessages = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMessages();

      setMessages(data);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to load messages. Make sure you are authenticated."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const unreadCount = messages.filter(
    (message) => message.status === "unread"
  ).length;

  const handleOpen = async (message) => {
    setSelectedMessage(message);

    if (message.status === "unread") {
      try {
        const updated = await markMessageAsRead(
          message.id
        );

        setMessages((current) =>
          current.map((item) =>
            item.id === message.id ? updated : item
          )
        );

        setSelectedMessage(updated);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) {
      return;
    }

    try {
      await deleteMessage(id);

      setMessages((current) =>
        current.filter((message) => message.id !== id)
      );

      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to delete message.");
    }
  };

  return (
    <section className="mt-10">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-white/30">
            Recruiter communication
          </p>

          <h2 className="mt-2 text-xl font-medium">
            Messages
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/35">
            {messages.length} total
          </span>

          <span className="rounded-full border border-amber-400/10 bg-amber-400/5 px-3 py-1.5 text-xs text-amber-400/70">
            {unreadCount} unread
          </span>
        </div>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl border border-white/10 bg-[#080808] p-8 text-sm text-white/35">
          Loading messages...
        </div>
      ) : messages.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-[#080808] p-10 text-center">
          <p className="text-sm text-white/30">
            No recruiter messages yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          {/* MESSAGE LIST */}

          <div className="space-y-2">
            {messages.map((message) => (
              <button
                key={message.id}
                type="button"
                onClick={() => handleOpen(message)}
                className={`w-full rounded-xl border p-5 text-left transition ${
                  selectedMessage?.id === message.id
                    ? "border-white/25 bg-white/[0.06]"
                    : "border-white/10 bg-[#080808] hover:border-white/20"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      {message.status === "unread" && (
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      )}

                      <p className="truncate text-sm font-medium">
                        {message.name}
                      </p>
                    </div>

                    <p className="mt-1 truncate text-xs text-white/30">
                      {message.email}
                    </p>
                  </div>

                  <span className="shrink-0 text-[10px] text-white/20">
                    {formatDate(message.created_at)}
                  </span>
                </div>

                {message.subject && (
                  <p className="mt-4 truncate text-sm text-white/50">
                    {message.subject}
                  </p>
                )}

                <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/25">
                  {message.message}
                </p>
              </button>
            ))}
          </div>

          {/* MESSAGE DETAIL */}

          <div className="min-h-[400px] rounded-2xl border border-white/10 bg-[#080808] p-7">
            {!selectedMessage ? (
              <div className="flex h-full min-h-[350px] items-center justify-center text-sm text-white/25">
                Select a message to view it.
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-white/25">
                      {selectedMessage.subject ||
                        "No subject"}
                    </p>

                    <h3 className="mt-2 text-xl font-medium">
                      {selectedMessage.name}
                    </h3>

                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="mt-1 block text-sm text-white/40 hover:text-white"
                    >
                      {selectedMessage.email}
                    </a>

                    {selectedMessage.company && (
                      <p className="mt-1 text-xs text-white/25">
                        {selectedMessage.company}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(selectedMessage.id)
                    }
                    className="rounded-lg border border-red-400/10 px-3 py-2 text-xs text-red-400/60 hover:text-red-400"
                  >
                    Delete
                  </button>
                </div>

                <div className="my-7 h-px bg-white/10" />

                <p className="whitespace-pre-wrap text-sm leading-7 text-white/50">
                  {selectedMessage.message}
                </p>

                <div className="mt-8 text-xs text-white/20">
                  Received{" "}
                  {formatDate(
                    selectedMessage.created_at
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

const formatDate = (value) => {
  if (!value) return "";

  return new Date(value).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

export default MessageManager;