CREATE PROCEDURE sp_InventoryGetData(
    @Search NVARCHAR(50) = NULL,
    @SearchColumn NVARCHAR(50)  = NULL,
    @SearchOrder NVARCHAR(5) = NULL,
    @PageNo INT = 1,
    @PageSize INT = 7
)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @offset INT = (@PageNo - 1) * @PageSize;
    SET @SearchColumn = ISNULL(NULLIF(@SearchColumn, ''), 'Name');
    SET @SearchOrder = CASE WHEN LOWER(ISNULL(@SearchOrder, 'asc')) = 'desc' THEN 'DESC' ELSE 'ASC' END;

    -- whitelist allowed columns
    IF @SearchColumn NOT IN ('Name','Category','Price','Quantity')
        SET @SearchColumn = 'Name';

    DECLARE @orderBy NVARCHAR(200) = QUOTENAME(@SearchColumn) + ' ' + @SearchOrder + ', ' + QUOTENAME('Name') + ' ASC';
    DECLARE @sql NVARCHAR(MAX) =
        N'WITH CTE AS (
            SELECT *, COUNT(*) OVER() AS TotalCount
            FROM Products
            WHERE (@Search IS NULL OR @Search = '''' OR Name LIKE ''%'' + @Search + ''%'' OR Category LIKE ''%'' + @Search + ''%'')
        )
        SELECT *
        FROM CTE
        ORDER BY ' + @orderBy + '
        OFFSET @offset ROWS FETCH NEXT @PageSize ROWS ONLY;';

    EXEC sp_executesql
        @sql,
        N'@Search NVARCHAR(50), @offset INT, @PageSize INT',
        @Search = @Search, @offset = @offset, @PageSize = @PageSize;
END
    