from zoneinfo import ZoneInfo

profiles = {

}

#returns a list of every profile
def get_all():
    return list(profiles.values())

#gets one specific user's profile
def get(username):
    return profiles.get(username)

#saves timezone under a username
def save_timezone(username, timezone):
    #ZoneInfo(timezone) will give an error if timezone isn't valid
    try:
        ZoneInfo(timezone)
        profiles[username] = {"username": username, "timezone": timezone}
        return "success"
    except Exception:
        return "failure"