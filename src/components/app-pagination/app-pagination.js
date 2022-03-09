import React from 'react'
import { Pagination } from 'antd'

import './app-pagination.css'

const AppPagination = ({ totalPage, currentPage, pageChange }) => {
  return (
    <Pagination
      className="pagination"
      size="small"
      total={totalPage}
      // defaultPageSize={6}
      defaultCurrent={1}
      current={currentPage}
      onChange={pageChange}
    />
  )
}

export default AppPagination
