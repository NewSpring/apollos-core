import { Link } from "react-router";
import Meta from "apollos/dist/core/components/meta";

export default ({ group, leaders, isLeader, join }) => (
  <section className="background--light-secondary hard">
    {/* Meta */}
    <Meta title={group.name} image={group.photo} description={group.description} />

    {/* Hero */}
    <div
      className="ratio--landscape@lap-wide-and-up ratio--square background--fill overlay--gradient"
      style={{
        overflow: "visible",
        backgroundImage: `url('${group.photo}')`,
        zIndex:10
      }}
    >
      <div className="soft-sides@anchored ratio__item one-whole floating--bottom">
        <div className="floating__item text-left one-whole soft-double-sides@lap-wide-and-up soft-sides soft-double-bottom">
          <h3 className="text-light-primary push-half-bottom">{group.name}</h3>
          <div className="locked">
            {leaders.map((leader, i) => (
              <div
                className="ratio--square round display-inline-block push-right background--fill"
                key={i}
                style={{
                  backgroundImage: `url(${leader.person.photo})`,
                  width: "80px",
                  height: "80px"
                }}
              >
                <div className="ratio__item"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Group Leader List*/}
    <div className="push-double-sides@anchored push-half-sides soft-double-top flush-ends card outlined outlined--light">
      <div className="card__item soft">
        <h7 className="text-dark-secondary">
          <small>Group Leaders</small>
        </h7>
        <h5 className="text-dark-secondary soft-half-top">
          {leaders.map((x, i) => {
            let string = `${x.person.nickName || x.person.firstName} ${x.person.lastName}`;
            if (leaders.length - 1 != i) string += ", ";
            return <span key={i}>{string}</span>
          })}</h5>
      </div>
    </div>

    {/* Main card stacks */}
    <section className="soft-double-sides@lap-wide-and-up soft-half-sides soft-half-ends flush-sides">

      {/* Join Group CTA */}
      {/* shows manage group if you are a leader / can manage */}
      <div className="card outlined outlined--light">
        <div className="grid card__item soft ">
          <h5 className="flush-bottom push-half-bottom@handheld push-half-bottom@lap push-half-top grid__item one-half@lap-wide-and-up one-whole text-center@handheld text-center@lap text-dark-secondary">#TheseAreMyPeople</h5>
          <div className="grid__item text-right@lap-wide-and-up text-center one-whole one-half@lap-wide-and-up">
            {(() => {
              let className = "flush-bottom push-half-bottom@handheld btn";
              if (isLeader) {
                return (
                  <a target="_blank" className={className} href={`${Meteor.settings.public.rock.baseURL}groups/leader?GroupId=${group.entityId}`}>
                    Manage Group
                  </a>
                )
              }

              return (
                <button onClick={() => join()} className={className}>
                  Join Group
                </button>
              );
            })()}
          </div>
        </div>
      </div>

      <div className="card outlined outlined--light hard one-whole">
        <div className="card__item push-half-top@handheld">
          <div className="soft-left@lap-wide-and-up soft soft-double-bottom soft-half-bottom@handheld">

            {/* Group Meeting Schedule */}
            {(() => {
              if (!group.schedule) return null;
              if (!group.schedule.description) return null;
              return (
                <div className="soft-double-bottom@lap-wide-and-up soft-bottom">
                  <h7 className="text-dark-secondary">Time</h7>
                  <h5 className="text-dark-secondary soft-half-top flush-bottom">
                    {group.schedule.description}
                  </h5>
                </div>
              );
            })()}

            {/* Group Location */}
            {(() => {
              if (!group.locations) return null;
              const loc = group.locations[0]
              if (!loc) return null;
              return (
                <div className="soft-double-bottom@lap-wide-and-up soft-bottom">
                  <h7 className="text-dark-secondary">
                    Address
                  </h7>
                  <h5 className="text-dark-secondary soft-half-top flush-bottom">
                    {loc.location.city}, {loc.location.state}
                  </h5>
                </div>
              );
            })()}

            {/* Group Information */}
            <div className="soft-double-bottom@lap-wide-and-up soft-bottom">
              <h7 className="text-dark-secondary">Information</h7>
              <h5 className="text-dark-secondary soft-half-top flush-bottom">
                {group.kidFriendly ? "Children Welcome" : "Adults Only"}
                {group.ageRange ? `, ${group.ageRange[0]} - ${group.ageRange[1]}` : ""}
              </h5>
            </div>

            {/* Group Description */}
            <div className="soft-double-bottom@lap-wide-and-up soft-bottom">
              <h7 className="text-dark-secondary">Description</h7>
              <h5 className="text-dark-secondary soft-half-top flush-bottom">
                {group.description}
              </h5>
            </div>

            {/* Group Members */}
            <div className="soft-double-bottom@lap-wide-and-up soft-bottom">
              <h7 className="text-dark-secondary">Members</h7>
              <div className="soft-half-top flush-bottom">
                {group.members.filter(x => x.person && x.person.photo).map((member, i) => (
                  <div
                    className="ratio--square round display-inline-block push-half-right background--fill"
                    key={i}
                    style={{
                      backgroundImage: `url(${member.person.photo})`,
                      width: "40px",
                      height: "40px"
                    }}
                  >
                    <div className="ratio__item"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="soft-bottom">
              <h7 className="text-dark-secondary">Tags</h7>
              <div className="soft-half-top flush-bottom">
                {group.tags && group.tags.map((tag, i) => (
                  <span className="tag push-half-right" key={i}>{tag.value}</span>
                ))}
                {(() => {
                  if (!group.type) return null;
                  return <span className="tag push-half-right">{group.type}</span>;
                })()}
                {(() => {
                  if (!group.kidFriendly) return null;
                  return <span className="tag push-half-right">kid friendly</span>;
                })()}
                {(() => {
                  if (!group.demographic) return null;
                  return <span className="tag push-half-right">{group.demographic}</span>;
                })()}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Search */}
      <div className="card outlined outlined--light">
        <div className="grid card__item soft ">
          <h5 className="flush-bottom push-half-bottom@handheld push-half-bottom@lap push-half-top grid__item one-half@lap-wide-and-up one-whole text-center@handheld text-center@lap text-dark-secondary">
            Looking for another group?
          </h5>
          <div className="grid__item text-right@lap-wide-and-up text-center one-whole one-half@lap-wide-and-up">
            <Link to="/groups/finder" className="flush-bottom push-half-bottom@handheld btn">
              Find A Group
            </Link>
          </div>
        </div>
      </div>
    </section>
  </section>
)
