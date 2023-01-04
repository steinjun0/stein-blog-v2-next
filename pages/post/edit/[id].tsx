import { Button, Input, NativeSelect, Select, TextField } from "@mui/material";
import API from "API";
import ListPushInput from "components/ListPushInput";
import { IPost } from "components/Types";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ChangeEvent, SetStateAction, useEffect, useRef, useState } from "react";


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
    const router = useRouter()

    const [title, setTitle] = useState<string>('');
    const [subtitle, setSubtitle] = useState<string>('');
    const [categories, setCategories] = useState<string[]>([]);
    const [fileNames, setFileNames] = useState<string[]>([]);
    const [md, setMd] = useState<string>('') // for save
    const [urlCacheBreaker, setUrlCacheBreaker] = useState<string>('')
    const mdRef = useRef<string>('') // for read
    const fileNamesRef = useRef<string[]>([])
    const [allCategories, setAllCategories] = useState<Array<{ id: number, name: string }>>()

    const postThumbnailLocationRef = useRef<'temp' | number>()

    let isSetListener = false

    function onClickSave() {
        type postPostDto = { title: string, subtitle: string, body: string, categories?: Array<string>, files?: Array<string> }
        const data: postPostDto = {
            title, subtitle, categories, body: md, files: fileNames
        }
        if (router.query.id === 'new') {
            API.postPost(data).then((res) => {
                if (res.status === 201) {
                    alert('업로드에 성공했습니다')
                    router.push(`/post/${res.data.postRes.id}`)
                } else {
                    alert('업로드에 실패했습니다')
                }
            })
        } else {
            API.patchPost(parseInt(`${router.query.id}`), data).then((res) => {
                if (res.status === 200) {
                    alert('수정에 성공했습니다')
                    router.push(`/post/${router.query.id}`)
                } else {
                    alert('수정에 실패했습니다')
                }
            })
        }

    }


    useEffect(() => {
        API.getCategories().then((res) => {
            if (res.status === 200) {
                console.log(res)
                const resCategories: Array<{ id: number, name: string }> = res.data
                setAllCategories(resCategories)
            } else {
                alert('카테고리를 받아오지 못했습니다')
            }
        })

        if (router.isReady) {
            if (router.query.id === 'new') {
                postThumbnailLocationRef.current = 'temp'
            }
            else if (!isNaN(parseInt(`${router.query.id}`))) {
                postThumbnailLocationRef.current = parseInt(`${router.query.id}`)
                console.log('parseInt(`${router.query.id}`)', parseInt(`${router.query.id}`))
                API.getPost({ id: parseInt(`${router.query.id}`) }).then((res) => {
                    if (res.status === 200) {
                        const post: IPost = res.data
                        setTitle(post.title)
                        setSubtitle(post.subtitle)
                        setMd(post.body)
                        setCategories([...post.categories.map(e => e.name)])
                        fileNamesRef.current = [...post.files.map(e => e.name)]
                    } else {

                    }
                })
            }

            var x = new MutationObserver(function (e) {
                const target = document.getElementsByClassName('w-md-editor-text-input')[0] as HTMLElement;

                if (target !== undefined && !isSetListener) {
                    isSetListener = true
                    target.addEventListener('paste', async (event: any) => {
                        var items = (event.clipboardData || event.originalEvent.clipboardData).items;
                        for (var index in items) {
                            var item = items[index];
                            if (item.kind === 'file') {
                                let file = item.getAsFile();
                                let fileName: string = getUnduplicatedName(file.name, fileNamesRef.current)

                                const res = await API.postFile({ file: file, name: fileName })
                                if (res.status === 201) {
                                    setFileNames(fileNames => [...fileNames, fileName])
                                    fileNamesRef.current = [...fileNamesRef.current, fileName]

                                    const newMd: string = mdRef.current + `<p align="center"><img src="${API.getPostFileUrl({ postId: 'temp', fileName: fileName })}" alt="${fileName}" style="max-height: 300px"/></p>`
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
        }


    }, [router.isReady])

    function onChangeThumbnailInput(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            API.postFile({ file: e.target.files[0], name: `thumbnail` })
                .then((res) => {
                    if (res.status === 201) {
                        postThumbnailLocationRef.current = 'temp'
                        alert('썸네일이 업로드 되었습니다')
                        setUrlCacheBreaker(new Date().getMilliseconds().toString())
                    } else {
                        alert('썸네일을 업로드하지 못하였습니다')
                    }
                })
        } else {
            alert('input에 파일이 비었습니다')
        }
    }

    function onPasteThumbnailText(e: any) {
        var items = (e.clipboardData || e.originalEvent.clipboardData).items;
        for (var index in items) {
            var item = items[index];
            if (item.kind === 'file') {
                let file = item.getAsFile();
                API.postFile({ file: file, name: 'thumbnail' }).then((res) => {
                    if (res.status === 201) {
                        postThumbnailLocationRef.current = 'temp'
                        alert('썸네일이 업로드 되었습니다')
                        setUrlCacheBreaker(new Date().getMilliseconds().toString())
                    } else {
                        alert('썸네일을 업로드하지 못하였습니다')
                    }
                })
            }
        }
    }

    function onClickDelete() {
        if (confirm('정말 삭제하시겠습니까?')) {
            API.deletePost(+router.query.id!).then((res) => {
                if (res.status === 200) {
                    alert('삭제 되었습니다.')
                    router.push('/post')
                } else {
                    alert('삭제를 실패했습니다.')
                }
            })
        }
    }


    return (
        <div className='flex flex-col w-full my-10'>
            <div className="flex-col">
                <div className="flex mb-2 justify-between items-end">
                    <span className="w-2/3">
                        <TextField variant="standard"
                            fullWidth
                            InputProps={{ style: { fontWeight: 700, fontSize: '30px' } }}
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }}
                        />
                    </span>
                    {router.query.id !== 'temp' &&
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => { onClickDelete() }}>
                            삭제
                        </Button>}

                </div>

                <div className="flex justify-between mb-3 items-end">
                    <div className="items-end w-72">
                        <TextField
                            fullWidth
                            variant="standard"
                            value={subtitle}
                            onChange={(e) => { setSubtitle(e.target.value) }}
                        />
                    </div>
                </div>
                <hr />
                <div className="flex my-4">
                    <div className="flex-col w-1/2">
                        Categories
                        <div className="flex">
                            {categories.map((e, i) => {
                                return <div key={i} style={{ cursor: 'pointer' }} onClick={() => { setCategories(categories.filter((v) => v !== e)) }}>
                                    <span>{e} |&nbsp;</span>
                                </div>
                            })}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div style={{ height: '100px', maxHeight: '100px', overflow: 'scroll' }}>
                            {allCategories && allCategories.map((e, i) => {
                                return <div key={i} onClick={() => {
                                    if (!categories.includes(e.name))
                                        setCategories([...categories, e.name])
                                }}>{e.name}</div>
                            })}
                        </div>

                        <ListPushInput categoryList={categories} setCategoryList={setCategories} />
                    </div>
                </div>
            </div>
            <hr />
            <div className="flex align-middle my-4">
                <img
                    src={API.getPostFileUrl({ postId: postThumbnailLocationRef.current!, fileName: 'thumbnail' }) + `?${urlCacheBreaker}`} alt=""
                    style={{ maxHeight: '100px' }}
                />
                <div className="flex-col w-full ml-4">
                    <input
                        type="file"
                        onChange={onChangeThumbnailInput}
                    />
                    <TextField
                        fullWidth
                        variant="standard"
                        onPaste={onPasteThumbnailText}
                    />
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
            <div id='md-preview' style={{ padding: '50px 0', height: '600px', maxHeight: '600px', overflow: 'scroll' }}>
                <Markdown source={md} />
            </div>
            <Button
                variant="outlined"
                style={{ cursor: 'pointer' }}
                onClick={() => { onClickSave() }}
            >{router.query.id === 'temp' ? '저장' : '수정'}</Button>
        </div>
    );
}