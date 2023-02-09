import Seo from "@/components/Base/Seo";
import ManagePage from "@/components/Manage/managePage";
import { useUser } from "@/store/useUser";

export default function Manage() {
    const { data } = useUser();
    return (
        <>
            <Seo title="Manage" />

            {data?.isSignedIn ? (
                <>
                    {!data.isAd && (
                        <div>관리자만 접근할 수 있는 페이지입니다.</div>
                    )}

                    {data.isAd && <ManagePage />}
                </>
            ) : (
                <div>로그인 후 사용가능합니다.</div>
            )}
        </>
    );
}
