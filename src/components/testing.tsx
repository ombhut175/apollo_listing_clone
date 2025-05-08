import useHydration from "../hooks/useHydration";
import LoadingSpinner from "./LoadingSpinner";

export default function Testing() {
    const isMounted = useHydration();

    if(!isMounted) {
        return (
            <div>
                <LoadingSpinner text="Loading Test Component" />
            </div>
        );
    }
    
    return (
        <div>
            <h1>Testing</h1>
        </div>
    );
} 