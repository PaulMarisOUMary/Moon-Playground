import { keymap } from "@codemirror/view";
import { EditorSelection } from "@codemirror/state";

export const tabKeymap = keymap.of([
  {
    key: "Tab",
    run: (view) => {
      const { state, dispatch } = view;
      const changes = state.changeByRange((range) => ({
        changes: { from: range.from, to: range.to, insert: "\t" },
        range: EditorSelection.cursor(range.from + 1),
      }));
      dispatch(
        state.update(changes, { scrollIntoView: true, userEvent: "input" })
      );
      return true;
    },
  },
]);