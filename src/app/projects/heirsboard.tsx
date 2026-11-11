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
		<div
			role="img"
			aria-label="12 by 12 Heirs game board in its starting position"
			className="grid aspect-square w-full grid-cols-12 overflow-hidden rounded-md ring-1 ring-line"
		>
			{BOARD.map((row, r) =>
				row.split("").map((piece, c) => {
					const isDark = (r + c) % 2 === 1;
					const isEmpty = piece === ".";
					const isWhitePiece = !isEmpty && piece === piece.toUpperCase();

					return (
						<div
							key={`${r}-${c}`}
							className={`flex items-center justify-center ${isDark ? "bg-[#ddd3bf]" : "bg-[#f1ebdf]"}`}
						>
							{!isEmpty && (
								<span
									className={`flex h-[78%] w-[78%] items-center justify-center rounded-full text-[9px] font-semibold leading-none sm:text-[10px] ${
										isWhitePiece
											? "bg-white text-ink ring-1 ring-black/10"
											: "bg-navy text-paper"
									}`}
								>
									{piece}
								</span>
							)}
						</div>
					);
				}),
			)}
		</div>
	);
}
