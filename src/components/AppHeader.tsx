import { UserContext } from "@/contexts/user";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

type MenuItem = {
  icon?: string;
  name: string;
  link?: string;
  click?: () => void;
};

const AppHeader = () => {
  const userStore = useContext(UserContext);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    if (userStore?.isLoggedIn) {
      setMenuItems([
        {
          icon: "i-carbon-request-quote",
          name: "New Post",
          link: "/articles/create",
        },
        { name: "Settings", link: "/settings" },
        { name: "Logout", click: () => userStore?.logout() },
      ]);

      return;
    }
    setMenuItems([
      {
        name: "Sign in",
        link: "/login",
      },
      {
        name: "Sign up",
        link: "/register",
      },
    ]);
  }, [userStore]);

  return (
    <header className="dark:text-white">
      <div className="container py-4 flex">
        <Link to="/" className="font-brand text-green font-bold text-xl">
          conduit
        </Link>
        <nav className="ml-auto flex gap-4">
          <>
            {menuItems.map((item, i) => {
              if (item.link) {
                return (
                  <Link key={i} to={item.link} className="flex items-center">
                    {item.icon && (
                      <i className={`inline-block mr-2 ${item.icon}`}></i>
                    )}
                    {item.name}
                  </Link>
                );
              } else {
                return (
                  <button
                    key={i}
                    type="button"
                    className="flex items-center"
                    onClick={item.click}
                  >
                    {item.icon && (
                      <i className={`inline-block mr-2 ${item.icon}`}></i>
                    )}
                    {item.name}
                  </button>
                );
              }
            })}
            {userStore?.user?.image && (
              <img
                className="rounded-full w-8 h-8"
                src={userStore.user.image}
                alt={userStore.user.username}
              />
            )}
          </>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
