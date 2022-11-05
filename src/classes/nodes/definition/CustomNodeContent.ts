import { NodeIO } from "./io/NodeIO";

export type CustomNodeContent = (io: NodeIO, id: string) => JSX.Element;
