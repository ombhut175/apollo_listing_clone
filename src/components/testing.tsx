import Loading from './Loading';
import useHydration from '../hooks/useHydration';

export default function Testing() {
    const isHydrating = useHydration();

    if(isHydrating) {
        return <Loading />;
    }
    
    return (
        <div>
            <h1>Testing</h1>
        </div>
    );
} 