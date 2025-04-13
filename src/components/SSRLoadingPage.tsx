const SSRLoadingPage = () => {
    return (
        <div className="min-h-screen bg-background py-10 flex flex-col justify-center items-center">
            <div className="flex justify-center scale-50 items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
            </div>
        </div>
    );
};

export default SSRLoadingPage;
