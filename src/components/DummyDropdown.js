import { useState } from "react";

const DummyDropdown = ({ dummyUsers, selected, setSelected }) => {
  const members = dummyUsers;
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = members.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ width: 250, position: "relative" }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          border: "1px solid #d1d5db",
          padding: "10px 12px",
          cursor: "pointer",
          background: "#fff",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 500,
        }}
      >
        {selected === -1
          ? "--select--"
          : selected !== null
          ? selected.name
          : "None of them"}
        <span
          style={{
            marginLeft: "10px",
            display: "flex",
            alignItems: "center",
            transition: "transform .25s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            stroke="#6b7280"
            fill="none"
            strokeWidth="2"
          >
            <path
              d="M6 9l6 6 6-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      {open && (
        <div
          style={{
            border: "1px solid #e5e7eb",
            background: "white",
            position: "absolute",
            width: "100%",
            zIndex: 10,
            marginTop: "4px",
            borderRadius: "10px",
            boxShadow:
              "0 10px 25px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.04)",
            overflow: "hidden",
          }}
        >
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              boxSizing: "border-box",
              border: "none",
              outline: "none",
              borderBottom: "1px solid #e5e7eb",
            }}
          />

          <div
            onClick={() => {
              setSelected(null);
              setOpen(false);
              setSearch("");
            }}
            style={{
              padding: "10px",
              cursor: "pointer",
              textAlign: "left",
              background: "#f9fafb",
            }}
            onMouseEnter={(e) => (e.target.style.background = "#f3f4f6")}
            onMouseLeave={(e) => (e.target.style.background = "transparent")}
          >
            None of them
          </div>

          {filtered.map((m, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSelected(m);
                setOpen(false);
                setSearch("");
              }}
              style={{
                padding: "10px",
                cursor: "pointer",
                textAlign: "left",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#f3f4f6")}
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
            >
              {m.name}
            </div>
          ))}

          {!filtered.length && (
            <div style={{ padding: "8px", color: "gray" }}>No match</div>
          )}
        </div>
      )}
    </div>
  );
};

export default DummyDropdown;
