import Signin from "@/components/Signin/Signin";
import Signup from "@/components/Signup/Signup";
import CreateAdForm from "@/pages/UserProfilePage/Components/CreateAdForm/CreateAdForm";
import UserAds from "@/pages/UserProfilePage/Components/UserAds/UserAds";
import UserInfoForm from "@/pages/UserProfilePage/Components/UserInfoForm/UserInfoForm";
const components = {
  signin: Signin,
  signup: Signup,
  createAdForm: CreateAdForm,
  userAccount: UserInfoForm,
  userAds: UserAds,
};

function DynamicComponent({ name }: { name: string }) {
  const SelectComponent = components[name];
  return <SelectComponent />;
}

export default DynamicComponent;
