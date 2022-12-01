import { storageService } from "../../fbase";
import { deleteObject, ref } from "firebase/storage";

const MusicUpload = () => {
    const onMusicSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div>
            <form>
                <input type={"file"} />
                <input type={"submit"} onClick={onMusicSubmit} />
            </form>
        </div>
    );
};

export default MusicUpload;
