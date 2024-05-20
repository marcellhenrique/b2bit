import React, { useEffect, useState } from "react";
import { getProfile, getToken } from "../../auth/authService";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/interfaces";

const ProfileInfo: React.FC = () => {
  const [profile, setProfile] = useState< User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        console.log(data);
        setProfile(data);
      } catch (error) {
        setError("Erro ao carregar o perfil");
      }
    };
    if (getToken() === null) {
      navigate("/");
    }
    fetchProfile();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!profile) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="bg-white min-w-80 mx-auto my-auto max-w-md py-8 px-7 shadow rounded-2xl">
      <div className="flex flex-col items-center justify-center mb-7 h-20">
        <label className="font-light text-sm mb-2">Profile picture</label>
        <img
          src={profile.avatar?.high}
          alt="Profile"
          className="rounded-lg h-16 w-16 object-cover"
        />
      </div>
      <form>
        <div className="mb-1">
          <label className="font-extralight">Your </label>
          <label className="font-sans">Name</label>
        </div>
        <div className="w-full py-3 px-4 bg-slate-200 rounded-lg mb-4 font-extralight text-sm">
          {profile.name}
        </div>
        <div className="mb-1">
          <label className="font-extralight">Your </label>
          <label className="font-sans">E-mail</label>
        </div>
        <div className="w-full py-3 px-4 bg-slate-200 rounded-lg font-extralight text-sm">
          {profile.email}
        </div>
      </form>
    </div>
  );
};

export default ProfileInfo;
