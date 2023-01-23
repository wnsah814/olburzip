import { useUser } from "@/store/useUser";
import ApplyList from "./applyList";
import UserList from "./userList";

export default function Manage() {
    const { data } = useUser();

    return (
        <>
            {data?.isSignedIn ? (
                <>
                    {!data.isAd && (
                        <div>관리자만 접근할 수 있는 페이지입니다.</div>
                    )}
                    {data.isAd && <ApplyList />}
                    {data.isAd && <UserList />}
                </>
            ) : (
                <div>로그인 후 사용가능합니다.</div>
            )}
        </>
    );
}
