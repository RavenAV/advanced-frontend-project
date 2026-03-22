import { PluginItem } from "@babel/core";

export default function(): PluginItem {
    return {
        visitor: {
            Program(path, state) {
                // получаем список атрибутов, которые нам понадобятся, но из продакшена хотим удалить
                const forbidden = state.opts?.props || []
                // проходимся по всем нодам дерева
                path.traverse({
                    // работаем с jsx файлами
                    JSXIdentifier(current) {
                        const nodeName = current.node.name

                        if (forbidden.includes(nodeName)) {
                            current.parentPath.remove()
                        }
                    }
                })
            }
        }
    }
}