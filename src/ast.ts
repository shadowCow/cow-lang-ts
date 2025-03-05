export type Ast<B, L> = AstBranch<B, L> | AstLeaf<L>;

export type AstBranch<B, L> = {
  kind: "AstBranch";
  nodeType: B;
  children: Ast<B, L>;
};
export function astBranch<B, L>(
  nodeType: B,
  children: Ast<B, L>
): AstBranch<B, L> {
  return {
    kind: "AstBranch",
    nodeType,
    children,
  };
}

export type AstLeaf<L> = {
  kind: "AstLeaf";
  nodeType: L;
  value: string;
};
export function astLeaf<L>(nodeType: L, value: string): AstLeaf<L> {
  return {
    kind: "AstLeaf",
    nodeType,
    value,
  };
}
