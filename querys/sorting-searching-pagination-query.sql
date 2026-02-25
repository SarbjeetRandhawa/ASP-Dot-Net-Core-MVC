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

	WITH CTE AS ( 
		SELECT *, COUNT(*) OVER() AS TotalCount
		FROM Inventory
		WHERE 
		(
			@SearchColumn = 'Name' AND ProductName LIKE '%' + @Search + '%'
			OR @SearchColumn = 'Category' AND Category LIKE '%' + @Search + '%'
			OR @SearchColumn IS NULL
		)
	)
	SELECT *
	FROM CTE
	ORDER BY
		CASE WHEN @SearchOrder = 'asc'  AND @SearchColumn = 'Name' THEN Name END ASC,
		CASE WHEN @SearchOrder = 'desc' AND @SearchColumn = 'Name' THEN Name END DESC,
		CASE WHEN @SearchOrder = 'asc'  AND @SearchColumn = 'Category' THEN Category END ASC,
		CASE WHEN @SearchOrder = 'desc' AND @SearchColumn = 'Category' THEN Category END DESC,
		CASE WHEN @SearchOrder = 'asc'  AND @SearchColumn = 'Price' THEN Price END ASC,
		CASE WHEN @SearchOrder = 'desc' AND @SearchColumn = 'Price' THEN Price END DESC,
		CASE WHEN @SearchOrder = 'asc'  AND @SearchColumn = 'Quantity' THEN Quantity END ASC,
		CASE WHEN @SearchOrder = 'desc' AND @SearchColumn = 'Quantity' THEN Quantity END DESC,
		Name ASC
	OFFSET @offset ROWS FETCH NEXT @PageSize ROWS ONLY;
END
