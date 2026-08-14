const BOARD = [
  "gytsnxpnstyg",
  "bbbbbbbbbbbb",
  "............",
  "............",
  "............",
  "............",
  "............",
  "............",
  "............",
  "............",
  "BBBBBBBBBBBB",
  "GYTSNXPNSTYG",
];

export default function HeirsBoard() {
  return (
    <div className="grid grid-cols-12 w-full aspect-square mx-auto rounded-lg overflow-hidden border border-white/10">
      {BOARD.map((row, r) =>
        row.split("").map((piece, c) => {
          const isDark = (r + c) % 2 === 1;
          const isEmpty = piece === ".";
          const isWhitePiece = !isEmpty && piece === piece.toUpperCase();

          return (
            <div
              key={`${r}-${c}`}
              className={`flex items-center justify-center ${
                isDark ? "bg-neutral-900" : "bg-neutral-700"
              }`}
            >
              {!isEmpty && (
                <span
                  className={`flex items-center justify-center w-[80%] h-[80%] rounded-full text-[10px] sm:text-xs font-bold leading-none ${
                    isWhitePiece
                      ? "bg-white/10 text-white"
                      : "bg-rose-500/15 text-rose-300"
                  }`}
                >
                  {piece}
                </span>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}