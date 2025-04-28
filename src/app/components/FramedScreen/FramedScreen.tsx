type GlassScreenProps = {
    children: React.ReactNode;
};

export default function FramedScreen({ children }: GlassScreenProps) {
    // justify-center: centers horizontally
    // items-center: centers vertically
    return (
        <div className="bg-white p-8 h-screen rounded">
            <div className="flex flex-col bg-black h-full p-8 shadow-2xl shadow-black rounded-2xl">
                {children}
            </div>
        </div>
    )
}