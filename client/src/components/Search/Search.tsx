import { useState, useEffect, useContext, SetStateAction } from "react";
import SearchInput from "./Components/SearchInput";
import { useDebounce } from "@/hooks/useDebounce";
import { CartItemsType } from "@/types/types";
import { CartContext } from "../Providers/CartProvider";

export const Search: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [products, setProducts] = useState<CartItemsType[]>([]);
  // DebouncedOutput is initialized to null in order to prevent searchInputValue from parent to be empty after first loading
  const [debouncedOutput, setDebouncedOutput] = useState<string | null>(null);
  const { allCartItems } = useContext(CartContext);

  const onChangeDebouncedEvent = (text: string): void => {
    setDebouncedOutput(text.trim().toLowerCase());
  };
  // Here onChangeDebounced is used to authorize api call after 800ms delay between each new entries
  const onChangeDebounced = useDebounce(onChangeDebouncedEvent);

  function searchQueries(query: string): void {
    setProducts(
      allCartItems.filter((p) => p.name.toLowerCase().includes(query))
    );
  }

  useEffect(() => {
    if (debouncedOutput) searchQueries(debouncedOutput);
  }, [debouncedOutput]);

  return (
    <SearchInput
      handleSearch={onChangeDebounced}
      query={query}
      setQuery={setQuery}
      products={products}
    />
  );
};
