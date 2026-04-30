import Mention from "@tiptap/extension-mention";
import tippy from "tippy.js";
import { ReactRenderer } from "@tiptap/react";
import SuggestionList from "./SuggestionList";

export const CustomMention = Mention.configure({
  HTMLAttributes: {
    class: "text-blue-500 font-semibold",
  },

  suggestion: {
    char: "@",

    items: async ({ query }) => {
      const res = await fetch(`/api/comment/search-users?query=${query}`);
      return await res.json();
    },

    render: () => {
      let component;
      let popup;

      return {
        onStart: (props) => {
          component = new ReactRenderer(SuggestionList, {
            props,
            editor: props.editor,
          });

          popup = tippy("body", {
            getReferenceClientRect: props.clientRect,
            content: component.element,
            showOnCreate: true,
            interactive: true,
            trigger: "manual",
            placement: "bottom-start",
          });
        },

        onUpdate(props) {
          component.updateProps(props);
        },

        onKeyDown(props) {
          return component.ref?.onKeyDown(props);
        },

        onExit() {
          popup[0].destroy();
          component.destroy();
        },
      };
    },
  },
});