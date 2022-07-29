import Add from "./Add.jsx";
import Rename from "./Rename.jsx";
import Remove from "./Remove.jsx";

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
};

export default (modalName) => modals[modalName];
