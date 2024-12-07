export const SkeletonComp = ({index}) => {
    return (<div key={`skeleton-${index}`}
                 className="border-2 rounded-xl p-6 shadow-md min-h-[200px] bg-secondary/50">
        <div className="animate-pulse space-y-6">
            <div className="h-6 bg-primary/20 rounded-lg w-3/4"></div>

            <div className="space-y-3">
                <div className="h-4 bg-primary/20 rounded-lg w-full"></div>
                <div className="h-4 bg-primary/20 rounded-lg w-5/6"></div>
                <div className="h-4 bg-primary/20 rounded-lg w-4/6"></div>
            </div>

            <div className="flex justify-end space-x-2 mt-4">
                <div className="h-8 w-8 bg-primary/20 rounded-full"></div>
                <div className="h-8 w-8 bg-primary/20 rounded-full"></div>
            </div>
        </div>
    </div>)
}