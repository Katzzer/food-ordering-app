# Food ordering app

## Description:
- It is a simple application that demonstrates ordering food. It is programmed in Next.js that sends orders to MS Azure
to API Management → Function App → Cosmo DB where data is saved

## How to run this application
- Set `AZURE_SUBSCRIPTION_KEY`, `AZURE_API_ENDPOINT`
  - `AZURE_SUBSCRIPTION_KEY` is in Azure -> Api Management -> APIs -> Subscription -> api-access -> Primary key or Secondary key
  - `AZURE_API_ENDPOINT` is in Azure -> Api Management -> APIs -> APIs -> click on api group -> Setting (on top) -> copy `Base URL`
- Create file .env.local and put there `AZURE_SUBSCRIPTION_KEY`, `AZURE_API_ENDPOINT` for local development
- You also have to set Environment variables to Static Web App, go to Azure, select app -> Settings -> Environment variables
and set `AZURE_SUBSCRIPTION_KEY`, `AZURE_API_ENDPOINT`

## Function App in Azure info
- Functions in Function App are actualized with GitHub action, there is repo for this [GitHub - food-ordering-app-functions](https://github.com/Katzzer/food-ordering-app-functions)

## Api Management in Azure info
- Apis in Api Management are actualized with GitHub action, there is repo for this [GitHub - food-ordering-app-api](https://github.com/Katzzer/food-ordering-app-api) (TODO: implement)

## App information
- Data from frontend are sent to backend (to `/api/save-order`) that is in Next.js, and it will send data to Azure `Api Management`
- To get all orders frontend get data from backend (`/api/get-all-order`) that is ni Next.js. Backend get the dat from Cosmo DB in Azure over `Api Management`

## MS Azure settings
- When creating new API endpoint assign a `Product` than go to API Management → APIs → Products → Subscription
and copy `Primary key` (or `Secondary key`, both have same function)
- Never use in production `Built-in all-access subscription` key because it has access to every API, use only `Product` key

## Troubleshooting
- Check environment variables in Azure
- Check access keys
- Check `Partion Key` in Cosmo DB, atm it is `/partitionKey`, each POST request when creating new entry in DB must have a partitionKey, e.g. `food`
- Run application in debug mode `npm run dev-debug` and add breakpoints to [pages/api/save-order.ts](pages/api/save-order.ts)

