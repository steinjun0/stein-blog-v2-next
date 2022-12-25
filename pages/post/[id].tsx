export default function WorkPage() {
    return (
        <div className='flex flex-col w-full'>
            <div className="flex-col">
                <div className="flex mb-2">
                    <span className="text-5xl">
                        title
                    </span>
                </div>
                <div className="flex justify-between mb-5">
                    <div className="flex items-end">
                        <span className="text-lg mr-3">subtitle</span>
                        <span className="mr-2 text-gray-700">create_date</span>
                        <span className="text-gray-700">edit_date__</span>
                    </div>
                    <span>category</span>
                </div>
            </div>
            <hr className="mb-7" />
            <div>body</div>
        </div>
    );
}