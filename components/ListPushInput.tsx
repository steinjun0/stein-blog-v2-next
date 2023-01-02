import { Dispatch, SetStateAction, useState } from "react";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import API from "API"
import { useEffect } from "react";
import { TextField } from "@mui/material";

function ListPushInput({ categoryList, setCategoryList }: { categoryList: string[], setCategoryList: Dispatch<SetStateAction<string[]>> }) {
    const [categoryText, setCategoryText] = useState('');

    const addNewCategory = () => {
        console.log('categoryText', categoryText)
        setCategoryList([...categoryList, categoryText])
        setCategoryText('')
    }

    const deleteCategory = (deletedCategory: string) => {
        const newCategoryList = categoryList.filter((e) => {
            if (e !== deletedCategory) {
                return true
            } else {
                return false
            }
        })
        setCategoryList(newCategoryList)
    }


    return <div>
        <div>
            <TextField
                onKeyPress={(e) => {
                    if (e.key === 'Enter' && categoryText !== '' && !categoryList.includes(categoryText)) {
                        addNewCategory()
                    }
                }}
                value={categoryText}
                onChange={(e) => {
                    setCategoryText(e.target.value)
                }}
                fullWidth={true}
                placeholder={'입력 후 Enter'}
            />
        </div>
    </div>;
}

export default ListPushInput;