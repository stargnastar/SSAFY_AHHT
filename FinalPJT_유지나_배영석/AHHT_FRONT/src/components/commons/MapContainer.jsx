import React, { useEffect, useState } from "react";

const { kakao } = window;

const MapContainer = ({ searchPlace }) => {
  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([]);

  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    // var markers = [];
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
        // 페이지 목록 보여주는 displayPagination() 추가
        displayPagination(pagination);
        setPlaces(data);
      }
    }

    // 검색결과 목록 하단에 페이지 번호 표시
    function displayPagination(pagination) {
      var paginationEl = document.getElementById("pagination"),
        fragment = document.createDocumentFragment(),
        i;

      // 기존에 추가된 페이지 번호 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement("a");
        el.href = "#";
        el.innerHTML = i;
        el.style.textDecoration = "none";
        el.style.fontSize = "20px";
        el.style.margin = "4px";
        el.style.color = "blue";

        if (i === pagination.current) {
          el.className = "on";
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            };
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, "click", function () {
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }
  }, [searchPlace]);

  return (
    <div
      style={{
        display: "flex",
        width: "60vw",
        height: "100%",
        marginRight: "1rem",
        boxShadow: "0 10px 20px -10px black",
        overflow: "hidden",
      }}
    >
      <div
        id="myMap"
        style={{
          width: "50%",
          height: "600px",
        }}
      ></div>
      <div
        id="result-list"
        style={{
          flex: "1",
          width: "50%",
          height: "600px",
          overflowY: "scroll",
          padding: "20px",
          background: "#f9f9f9",
          boxSizing: "border-box",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Search Results</h2>
        {Places.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {Places.map((place, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "20px",
                  padding: "10px",
                  background: "#fff",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  borderRadius: "4px",
                }}
              >
                <h3>{place.place_name}</h3>
                {place.road_address_name && (
                  <p>
                    <strong>Road Address:</strong> {place.road_address_name}
                  </p>
                )}
                {place.address_name && (
                  <p>
                    <strong>Address:</strong> {place.address_name}
                  </p>
                )}
                {place.phone && (
                  <p>
                    <strong>Phone:</strong> {place.phone}
                  </p>
                )}
                <a
                  href={`https://map.kakao.com/link/map/${place.id}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: "10px",
                    textDecoration: "none",
                    color: "#007bff",
                  }}
                >
                  자세히 보러가기
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
        <div id="pagination"></div>
      </div>
    </div>
  );
};

export default MapContainer;
