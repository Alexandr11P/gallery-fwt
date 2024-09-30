export default function paginationList(
  active: string,
  classLi: string,
  numOfPages: number,
  pageNumber: number,
  setPageNumber: (i: number) => void,
) {
  const list: JSX.Element[] = [];
  for (let i = 1; i <= numOfPages; i += 1) {
    list.push(
      <li key={i} className={i === pageNumber ? active : classLi}>
        <button type="button" onClick={() => setPageNumber(i)}>
          {i}
        </button>
      </li>,
    );
  }
  if (numOfPages > 5) {
    const newList = [list[0]];
    if (pageNumber > 3) {
      newList.push(<li key="p1">...</li>);
    }
    if (pageNumber > 2 && pageNumber < numOfPages - 1) newList.push(...list.slice(pageNumber - 2, pageNumber + 1));
    if (pageNumber < 3) {
      newList.push(...list.slice(1, 3));
    }
    if (pageNumber > numOfPages - 2) {
      newList.push(...list.slice(numOfPages - 4, numOfPages - 1));
    }
    if (numOfPages - pageNumber > 2) {
      newList.push(<li key="p2">...</li>);
    }
    newList.push(list[numOfPages - 1]);
    return newList;
  }
  return list.slice(-5);
}
