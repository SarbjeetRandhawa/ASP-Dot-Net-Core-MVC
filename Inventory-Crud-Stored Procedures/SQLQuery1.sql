CREATE Procedure sp_InventoryGetData(
	@Search NVARCHAR(50) = NULL,
	@SearchColumn Nvarchar(50)  = Null,
	@SearchOrder Nvarchar(5) = Null,
	@PageNo INT = 1,
	@PageSize Int = 7

)
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @offset = (@PageNo - 1) * @PageSize;
	WITH 
		
