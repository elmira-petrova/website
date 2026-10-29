import { Item } from "./Item/Item";

import css from "./ItemList.module.scss";

type ItemListProps = {
  items: string[];
};

export const ItemList = (props: ItemListProps) => {
  return (
    <ul className={css.list}>
      {props.items.map((item) => (
        <Item key={item} name={item} />
      ))}
    </ul>
  );
};
