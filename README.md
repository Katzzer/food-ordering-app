# Food ordering app

## Description:
- It is a simple application that demonstrates ordering food. It is programmed in Next.js that sends orders to MS Azure
to API Management → Function App → Cosmo DB where data is saved

## Function App in Azure info
- Functions in Function App are actualized with GitHub action, there is repo for this [GitHub - food-ordering-app-functions](https://github.com/Katzzer/food-ordering-app-functions)

## Api Management in Azure info
- Apis in Api Management are actualized with GitHub action, there is repo for this [GitHub - food-ordering-app-api](https://github.com/Katzzer/food-ordering-app-api) (TODO: implement)

## App information
- Data from frontend are sent to backend (to `/api/save-order`) that is in Next.js, and it will send data to Azure `Api Management`

## MS Azure settings
- When creating new API endpoint assign a `Product` than go to API Management → APIs → Products → Subscription
and copy `Primary key` (or `Secondary key`, both have same function)
- Never use in production `Built-in all-access subscription` key because it has access to every API, use only `Product` key

## Troubleshooting
- Check environment variables in Azure
- Check access keys
- Check `Partion Key` in Cosmo DB, atm it is `/partitionKey`, each POST request when creating new entry in DB must have a partitionKey, e.g. `food`
- Run application in debug mode `npm run dev-debug` and add breakpoints to [pages/api/save-order.ts](pages/api/save-order.ts)

## TODO:
- remove `subscriptionKey`, generate new and use ENVIRONMENT_VARIABLE
