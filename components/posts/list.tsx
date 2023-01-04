import React, { useState } from 'react';
import {
  useDataGrid,
  DataGrid,
  GridColumns,
  DateField,
  List,
  ShowButton,
  EditButton,
} from '@pankod/refine-mui';

import { IPost, ICategory } from 'interfaces';

export const PostList: React.FC = () => {
  const [category, setCategory] = useState<null | string>(null);

  const { dataGridProps } = useDataGrid<IPost>({
    resource: 'posts',
    initialFilter: [
      { field: 'category.title', operator: 'eq', value: category },
    ],
    metaData: {
      select: '*, categories!categories_posts(title)',
    },
  });

  const categoryIds = dataGridProps.rows.map((item) => item.category.id);
  const { data: categoriesData, isLoading } = useMany<ICategory>({
      resource: "categories",
      ids: categoryIds,
      queryOptions: {
          enabled: categoryIds.length > 0,
      },
  });

  const columns = React.useMemo<GridColumns<IPost>>(
    () => [
      {
        field: 'promptTmpl',
        headerName: 'Prompt Template',
        flex: 1,
        minWidth: 350,
      },
      {
        field: 'category',
        headerName: 'Category',
        type: "number",
        minWidth: 250,
        flex: 1,
        renderCell: function render({ row }) {
          if (isLoading) {
              return "Loading...";
          }

          const category = categoriesData?.data.find(
              (item) => item.id === row.category.id,
          );
          return category?.title;
          // return (
          //   <div>
          //     {row.categories.map((category: ICategory) => (
          //       <span className="mr-2">{category.title}</span>
          //     ))}
          //   </div>
          // );
        },
      },
    [categoriesData, isLoading, category],
  );

  console.log({ list: { dataGridProps } });
  return (
    <>
      <button onClick={() => setCategory('test')}>change Category</button>
      <List
        wrapperProps={{
          sx: {
            display: 'flex',
            flexDirection: 'column',
            flex: '1',
          },
        }}
      >
        <DataGrid {...dataGridProps} columns={columns} autoHeight />
      </List>
    </>
  );
};
