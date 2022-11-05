import { AnyHandle } from "./base/AnyHandle";

export default interface NodeHandleType {
	name: string;
	color?: string;

	allowedInputs?: NodeHandleType[];
}

export const canConnect = (
	source: NodeHandleType,
	target: NodeHandleType
): boolean => {
	if (target.name === "any") return true;
	else if (target.name === source.name) return true;
	else
		return (
			target.allowedInputs?.some(
				(input) => input === source || input === AnyHandle
			) ?? false
		);
};
