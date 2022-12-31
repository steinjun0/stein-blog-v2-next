import { TextField } from "@mui/material";
import API from "API";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";


const MDEditor = dynamic(
    () => {
        const res = import("@uiw/react-md-editor")
        res.then((mod) => {
            console.log('mod', mod)
            mod.constructor = () => {
                console.log('hiasdfadsf')
            }
        })
        return res
    },
    { ssr: false }
);

const Markdown = dynamic(
    () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
    { ssr: false }
);

function getUnduplicatedName(originFileName: string, fileNames: Array<string>): string {
    let fileName: string = originFileName
    let resultName: string = ''
    while (true) {
        if (fileNames.includes(fileName)) {
            const checkIdxDuplication = /\(+[0-9]+\).*$/.exec(fileName)
            if (checkIdxDuplication) { // name(n).ext 존재
                const numberAndExt = checkIdxDuplication[0]
                let dupIdx: number = +numberAndExt.slice(1, numberAndExt.indexOf(')'))

                resultName = fileName.slice(0, checkIdxDuplication.index) + `(${++dupIdx})` + numberAndExt.slice(numberAndExt.lastIndexOf('.'))
                while (fileNames.includes(resultName)) {
                    resultName = fileName.slice(0, checkIdxDuplication.index) + `(${++dupIdx})` + numberAndExt.slice(numberAndExt.lastIndexOf('.'))
                }
                return resultName
            } else { // name.ext 존재
                fileName = fileName.slice(0, fileName.lastIndexOf('.')) + '(1)' + fileName.slice(fileName.lastIndexOf('.'))
                continue
            }
        } else {
            return fileName
        }
    }

}

export default function WorkPage() {
    const [title, setTitle] = useState<string>('');
    const [subtitle, setSubtitle] = useState<string>('');
    const [fileNames, setFileNames] = useState<Array<string>>([]);
    const [md, setMd] = useState<string>('') // for save
    const mdRef = useRef<string>('') // for read
    const fileNamesRef = useRef<Array<string>>([])

    let isSetListener = false


    useEffect(() => {
        var x = new MutationObserver(function (e) {
            const target = document.getElementsByClassName('w-md-editor-text-input')[0] as HTMLElement;

            if (target !== undefined && !isSetListener) {
                isSetListener = true
                target.addEventListener('paste', async (event: any) => {
                    var items = (event.clipboardData || event.originalEvent.clipboardData).items;
                    console.log(JSON.stringify(items)); // might give you mime types
                    for (var index in items) {
                        var item = items[index];
                        if (item.kind === 'file') {
                            let file = item.getAsFile();
                            let fileName: string = getUnduplicatedName(file.name, fileNamesRef.current)

                            const res = await API.postFile({ file: file, name: fileName })
                            if (res.status === 201) {
                                setFileNames(fileNames => [...fileNames, fileName])
                                fileNamesRef.current = [...fileNamesRef.current, fileName]

                                const newMd: string = mdRef.current + `<p align="center"><img src="${API.getPostFileUrl({ postId: 'temp', fileName: fileName })}" alt="${fileName}"/></p>`
                                setMd(newMd)
                            } else {
                                alert('이미지가 업로드 되지 못하였습니다!')
                            }
                        }
                    }
                });
            }

            if (e[0].addedNodes.length > 0) {
                const editorTextArea = document.getElementsByClassName('w-md-editor-aree w-md-editor-input')[0] as HTMLElement
                // const editorPreview = document.getElementById("viewer")!.firstElementChild?.firstElementChild as HTMLElement
                const editorPreview = document.getElementById('md-preview') as HTMLElement
                editorTextArea.onscroll = (e) => {
                    editorPreview.scrollTo(0, Math.round(editorTextArea.scrollTop * ((editorPreview.scrollHeight - editorPreview.offsetHeight) / (editorTextArea.scrollHeight - editorTextArea.offsetHeight))))
                }
                editorPreview.onscroll = (e) => {
                    editorTextArea.scrollTo(0, Math.round(editorPreview.scrollTop * ((editorTextArea.scrollHeight - editorTextArea.offsetHeight) / (editorPreview.scrollHeight - editorPreview.offsetHeight))))
                }
            }


        });
        x.observe(document.getElementById('MDEditor_parent')!, { childList: true });

    }, [])


    return (
        <div className='flex flex-col w-full mt-10'>

            <div className="flex-col">
                <div className="flex mb-2 justify-between items-end">
                    <span className="text-3xl font-bold">
                        <TextField variant="standard"
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }}
                        />
                    </span>
                    <span className="text-sm">category</span>
                </div>
                <div className="flex justify-between mb-3 items-end">
                    <div className="flex items-end">
                        <TextField variant="standard"
                            value={subtitle}
                            onChange={(e) => { setSubtitle(e.target.value) }}
                        />
                    </div>
                </div>
            </div>
            <hr className="mb-7" />
            <div className="" id="MDEditor_parent">
                <MDEditor
                    value={md}
                    onChange={(value) => {
                        value ? setMd(value) : setMd('')
                        value ? mdRef.current = value : mdRef.current = ''
                    }}
                    autoFocus
                    enableScroll
                    preview="edit"
                />
            </div>
            <div id='md-preview' style={{ padding: '50px 0', maxHeight: '400px', overflow: 'scroll' }}>
                <Markdown source={md} />
            </div>

        </div>
    );
}