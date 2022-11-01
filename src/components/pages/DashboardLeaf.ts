import { ComponentType } from "react";
import { Dashboard } from "../templates/Dashboard";
import ReactLeaf from "./ReactLeaf";

// ~~~~~ Dashboard to open node editors ~~~~ //

export default class DashboardLeaf extends ReactLeaf {
	getReactComponentType(): ComponentType<typeof Dashboard> {
		return Dashboard;
	}

	getDisplayText(): string {
		return "Flow - Dashboard";
	}
}
