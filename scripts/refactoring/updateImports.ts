import { Project } from 'ts-morph'

const project = new Project({})
// добавляем файлы по которым ts-morph будет проходиться
project.addSourceFilesAtPaths('src/**/*.ts')
project.addSourceFilesAtPaths('src/**/*.tsx')

const files = project.getSourceFiles()

function isAbsolute(value: string) {
    const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages']
    return layers.some(layer => value.startsWith(layer))
}

files.forEach(sourceFile => {
    const importDeclaration = sourceFile.getImportDeclarations()

    importDeclaration.forEach(importDeclaration => {
        const value = importDeclaration.getModuleSpecifierValue()
        //const importPathValue = importPath.getText(sourceFile)

        if (isAbsolute(value)) {
            importDeclaration.setModuleSpecifier(`@/${value}`)
        }
    })
})

project.save()