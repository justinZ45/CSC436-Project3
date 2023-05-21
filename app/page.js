// @todo ADD ERROR HANDLING THROUGHOUT APP

import { getLatestUsers } from "../utils/data";
import Link from "next/link";
export const revalidate = 20;

export default async function Home() {
  const { success, data, error } = await getLatestUsers();

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (data.length === 0) {
    return (
      <h3 className="my-10 h3 text-4xl text-center font-extrabold">
        No users have signed up yet.
      </h3>
    );
  }

  return (
    <main>
      <h2 className="my-10 h1 text-4xl text-center font-extrabold">
        Latest Lists
      </h2>
      {data.map(({ name, user_id }) => {
        return (
          <div className="flex justify-center items-center" key={name}>
            <div className="text-center font-bold">
              <div className="transform transition duration-400 hover:scale-125 ">
                <Link
                  key={user_id}
                  href={`/user/${user_id}`}
                  className="block my-5 button small"
                >
                  <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white border-4 border-black mb-5 mt-5 ">
                    <div className="px-6 py-4">
                      <p> {`${name}'s Lists`}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </main>
  );

  return <main></main>;
}
