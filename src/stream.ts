export type ChStream = {
  getPosition(): number;
  isEof(): boolean;
  peek(): string;
  eat(): string;
};

export function createChStream(text: string): ChStream {
  let position = 0;

  const stream: ChStream = {
    getPosition: function (): number {
      return position;
    },
    isEof: function (): boolean {
      return position >= text.length;
    },
    peek: function (): string {
      return text.charAt(position);
    },
    eat: function (): string {
      position += 1;

      return text.charAt(position - 1);
    },
  };

  return stream;
}
