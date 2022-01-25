| Status        | Current                          |
| ------------- | -------------------------------- |
| Category      | Informational                    |
| Team          | Supplier & Accounting (xtraCHEF) |
| Author(s)     | A. Patel, Senthil.SB             |
| Created Date  | January 2022                     |
| Modified Date | January 2022                     |

# Snapshot Approach for Dashboard

Create Snapshot of data for new Dashboard. Querying the backend MSSQL DB and computing `Aggregate/Compare/Sort` the data will slowdown the dashboard screen loading time. Building predefined `Snapshot` and storing in the AWS DynamoDB and fetching the same will enhance user experience of the dashboard screen.

### sa-snapshot-master DynamoDB Table

```json
{
  "guid": "",
  "Name": "PRICE_TRACKER | FOOD_COST",
  "dailyMaxCount": 2,
  "createdOn": "yyyymmdd",
  "timeBase": true,
  "timeArray": [1000, 2100],
  "active": true
}
```

### Daily Snapshot Tracker Service

Runs daily once and creates the list of all the Tenant Active Locations requires snapshots `PRICE_TRACKER | FOOD_COST` and populates the _sa-snapshot-location-tracker_ table.

### sa-snapshot-location-tracker DynamoDB Table

```json
{
  "guid": "",
  "name": "PRICE_TRACKER | FOOD_COST",
  "tenantGuid": "",
  "locationGuid": "",
  "dailyCount": 0,
  "date": "yyyymmdd",
  "createdOn": "yyyy-mm-ddThh:mm:ss.ffff",
  "lastSnapshotOn": "yyyy-mm-ddThh:mm:ss.ffff",
  "active": true,
  "error": ""
}
```

### Snapshot Stager Service

Runs on regular interval checks between ```sa-snapshot-master``` and ```sa-snapshot-location-tracker``` tables

    active=true and dailyCount < dailyMaxCount
    timeBase=true and time >= timeArray[dailyCount]

Add the message to respective SQS queues `PRICE_TRACKER and FOOD_COST`

### Snapshot Builder Service

Polls the queue on the regular interval of time dequeue the message and creates the snapshots required for `PriceTracker and FoodCost`

Checks for the below `PriceTracker and FoodCost` snapshots are present and creates the missing snapshot for the location.

    #To do define Current Month#
    Today,Today-1,Today-7,Today-14, CurrentMonth,CurrentMonth-1,CurrentMonth-2,CurrentMonth-3

On successful completion

    dailyCount++
    lastSnapshotOn=CurrentDateTime

On Exception

    error=exception message
