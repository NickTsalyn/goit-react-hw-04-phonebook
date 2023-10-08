import { FilterWrapper } from "./Filter.styled"



export const Filter = ({filter, filterchange}) => {
    return (
        <FilterWrapper>
      <label htmlFor="Filter">Find contacts by name</label>
      <input type="text" name="Filter" value={filter} onChange={filterchange} />
      </FilterWrapper>
    )
}