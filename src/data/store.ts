import create from "zustand";
import appModel from "./example/appModel";
import AppModel from "./models/AppModel";

const useAppModel = create<AppModel>(() => appModel);

export default useAppModel;
