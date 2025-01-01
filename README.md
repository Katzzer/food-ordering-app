# Food ordering app

## Description:
- It is a simple application that demonstrates ordering Food programmed in Next.js that sends orders to MS Azure
to API Management -> Function App -> Cosmo DB where are data saved 

## App information
- Data from frontend are sent to backend (`/api/save-order`) that is in Next.js, and it will send data to Azure `Api Management`

## MS Azure settings
- When creating new API endpoint assign a `Product` than go to API Management -> APIs -> Products -> Subscription
and copy `Primary key` (or `Secondary key`, both have same function)
- Never use in production `Built-in all-access subscription` key because it has access to every API, use only `Product` key

## Troubleshooting
- Check environment variables in Azure
- Check access keys
- Check `Partion Key` in Cosmo DB, atm it is `/partitionKey`, each POST request for when creating new entry in DB must have a partitionKey, e.g. `food`

## TODO:
- remove `subscriptionKey`, generate new and use ENVIRONMENT_VARIABLE
