import path from 'path'
import { Project } from 'ts-morph'

const project = new Project({})
// добавляем файлы по которым ts-morph будет проходиться
project.addSourceFilesAtPaths('src/**/*.ts')
project.addSourceFilesAtPaths('src/**/*.tsx')

const files = project.getSourceFiles()
const uiPath = path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui')
const sharedUiDirectory = project.getDirectory(uiPath)
const componentsDirs = sharedUiDirectory?.getDirectories()

function isAbsolute(value: string) {
    const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages']
    return layers.some(layer => value.startsWith(layer))
}

componentsDirs?.forEach(directory => {
    // путь до index.ts файла
    const indexFilePath = `${directory.getPath()}/index.ts`
    const indexFile = directory.getSourceFile(indexFilePath)

    if (!indexFile) {
        const sourceCode = `export * from './${directory.getBaseName()}'`
        const file = directory.createSourceFile(indexFilePath, sourceCode, { overwrite: true })
        file.save() // создаем файл в ОС с нужными настройками
    }
})

files.forEach(sourceFile => {
    const importDeclaration = sourceFile.getImportDeclarations()
    importDeclaration.forEach(importDeclaration => {
        const value = importDeclaration.getModuleSpecifierValue()
        const valueWithoutAlias = value.replace('@/', '')
        
        const segments = valueWithoutAlias?.split('/')
        const isSharedLayer = segments?.[0] === 'shared'
        const isUiSlice = segments?.[1] === 'ui'

        if (isAbsolute(valueWithoutAlias) && isSharedLayer && isUiSlice) {
            // разделили, лишнее удалили, затем склеили обратно
            const result = valueWithoutAlias.split('/').slice(0, 3).join('/')
            importDeclaration.setModuleSpecifier(`@/${result}`)
        }
    })
})

project.save()