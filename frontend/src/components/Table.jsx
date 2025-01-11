import ButtonLink from "./ButtonLink";
import Problem from "./Problem";

function Table({ problems }) {
  return (
    <div className="mx-auto w-10/12 max-w-[1200px] pt-10">
      <div className="flex items-center justify-between">
        <h1 className="mb-6 text-3xl font-bold">Problems</h1>
        <ButtonLink>submissons</ButtonLink>
      </div>
      <div className="">
        <table className="min-w-full border border-gray-200 bg-purple-300 hover:bg-purple-900">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-black-200 border-b-2 px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-black">
                Title
              </th>

              <th className="border-b-2 border-gray-200 px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-black">
                Difficulty
              </th>
              <th className="border-b-2 border-gray-200 px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-black">
                Topics
              </th>
              <th className="border-b-2 border-gray-200 px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-black">
                Companies
              </th>
            </tr>
          </thead>
          <tbody>
            {problems?.map((problem) => (
              <Problem key={problem._id} problem={problem} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
