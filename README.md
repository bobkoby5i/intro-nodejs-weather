![Coders-Lab-1920px-no-background](https://user-images.githubusercontent.com/30623667/104709387-2b7ac180-571f-11eb-9b94-517aa6d501c9.png)

# Kilka ważnych informacji

Przed przystąpieniem do rozwiązywania zadań przeczytaj poniższe wskazówki

## Jak zacząć?

1. Stwórz [*fork*](https://guides.github.com/activities/forking/) repozytorium z zadaniami.
2. Sklonuj fork repozytorium (stworzony w punkcie 1) na swój komputer. Użyj do tego komendy `git clone adres_repozytorium`
Adres możesz znaleźć na stronie forka repozytorium po naciśnięciu w guzik "Clone or download".
3. Rozwiąż zadania i skomituj zmiany do swojego repozytorium. Użyj do tego komend `git add nazwa_pliku`.
Jeżeli chcesz dodać wszystkie zmienione pliki użyj `git add .` 
Pamiętaj że kropka na końcu jest ważna!
Następnie skommituj zmiany komendą `git commit -m "nazwa_commita"`
4. Wypchnij zmiany do swojego repozytorium na GitHubie.  Użyj do tego komendy `git push origin master`
5. Stwórz [*pull request*](https://help.github.com/articles/creating-a-pull-request) do oryginalnego repozytorium, gdy skończysz wszystkie zadania.

Poszczególne zadania rozwiązuj w odpowiednich plikach.

### Poszczególne zadania rozwiązuj w odpowiednich plikach.

**Repozytorium z ćwiczeniami zostanie usunięte 2 tygodnie po zakończeniu kursu. Spowoduje to też usunięcie wszystkich forków, które są zrobione z tego repozytorium.**


Twoim dzisiejszym zadaniem będzie stworzenie prostej porównywarki wyników dla serwisów pogodowych. Korzystać będziesz z trzech bardzo popularnych serwisów tj. `Weatherbit API`, `OpenWeather Map API` oraz `AccuWeather API`. Zebrane informację wyświetlisz w prawie gotowej i dołączonej do zadania części klienckiej Twojej aplikacji.

## Dodatkowe informacje

Część kliencka aplikacji znajduje się w folderze `bootstrap/weather`. Napisana jest z wykorzystaniem znanej Ci już biblioteki `lit-html`. Nie musisz martwić się o widoki i style, wszystko jest gotowe, a Twoim jedynym zadaniem po stronie klienckiej będzie uzupełnienie parametrów funkcji `fetch` z `Fetch API`, tak aby wysłać zapytanie, do wystawionego przez Twój serwer węzła końcowego (ang. endpoint).

## Wstęp

Twoim zadaniem jest skorzystać z dostępnych, bezpłatnych API pogodowych i stworzyć porównywarkę pogody, taką jak na obrazku poniżej.

![App](images/App.png)

Strona kliencka aplikacji jest już gotowa i nie będzie wymagała od Ciebie dużo pracy. Twoim zadaniem jest stworzenie serwisu agregującego dane z trzech różnych API, i wystawiającego węzeł końcowy zawierający te dane, w spójnym formacie. Dane te będą odpowiednio wyświetlane po stronie klienckiej.

## Zadania

**Rozwiązywanie zadań rozpocznij od wykonania komedy `npm install` zarówno w głównym folderze aplikacji jak i w folderze `weather`.**

Aplikację uruchomisz a pomocą komendy `npm run start`.

### Zadanie 1

1. Uzupełnij plik `.env` odpowiednimi danymi. Ustaw port na `3000`, a zmienną `NODE_ENV` na `development`.
2. Umieść w pliku także wygenerowane klucze do każdego z API. Pamiętaj aby ich nie dodawać ich do repozytorium.
3. W pliku `app.js` ustaw port, w taki sposób aby jego wartość odczytywana była z pliku `.env`.
4. Uruchom serwer i sprawdź czy wszystko działa.

## Zadanie 2

W folderze `/mocks` znajdują się pliki z przykładowymi odpowiedziami z każdego z API. W pliku `/routes/weather-mocks.js` obsłuż ścieżki, zwracające zawartość każdego pliku w folderze `/mocks`. Nazwij je w odpowiedni sposób.

Użyj do tego przygotowanej przez Ciebie w pliku `/utils/utils.js` funkcji odczytującej dane z pliku.

## Zadanie 3

W pliku `/api-services/weather-bit-api-service.js` znajdują się dwie klasy z takimi samymi metodami.

Uzupełnij metodę `getCurrent` klasy `WeatherBitMockService` w taki sposób, aby odpytywała stworzony przez Ciebie w `Zadaniu 2` węzeł końcowy (endpoint), z przykładowymi danymi z `Weatherbit API` i zwracała je w odpowiedzi.

## Zadanie 4

Uzupełnij metodę `getCurrent` klasy `WeatherBitApiService` w taki sposób, aby odpytywała `Weatherbit API` o prawdziwe dane i zwracała je lub wyrzucała wyjątek jeśli zapytanie do serwisu nie powiedzie się.

## Zadanie 5

W pliku `/api-services/open-weather-map-api-service.js` znajdują się dwie klasy z takimi samymi metodami.

Uzupełnij metodę `getWeather` klasy `OpenWeatherMapMockService` w taki sposób, aby odpytywała stworzony przez Ciebie w `Zadaniu 2` węzeł końcowy (endpoint), z przykładowymi danymi z `OpenWeather Map API` i zwracała je w odpowiedzi.

## Zadanie 6

Uzupełnij metodę `getWeather` klasy `OpenWeatherMapApiService` w taki sposób, aby odpytywała `OpenWeather Map API` o prawdziwe dane i zwracała je lub wyrzucała wyjątek jeśli zapytanie do serwisu nie powiedzie się.

## Zadanie 7

W pliku `/api-services/accu-weather-api-service.js` znajdują się dwie klasy z takimi samymi metodami.

Uzupełnij metody `getLocation`, `getCurrentConditions` oraz `getDailyForecast` klasy `AccuWeatherMockService` w taki sposób, aby odpytywały stworzone przez Ciebie w `Zadaniu 2` węzły końcowe (endpoints), z przykładowymi danymi z `AccuWeather API` i zwracała je w odpowiedzi.

## Zadanie 8

Uzupełnij metody `getLocation`, `getCurrentConditions` oraz `getDailyForecast` klasy `AccuWeatherApiService` w taki sposób, aby odpytywały `AccuWeather API` o prawdziwe dane i zwracały je lub wyrzucały wyjątek jeśli zapytania do serwisu nie powiodą się.

## Zadanie 9

W pliku `/adapters/empty-weather-object.js` znajdziesz strukturę obiektu jaki chcielibyśmy otrzymać w rezultacie mapowania danych z odpowiedzi każdego z serwisów.

Twoim zadaniem jest uzupełnić metodę `getWeather` w pliku `/adapters/weather-bit-adapter.js` w taki sposób, aby zwracała obiekt o następującej strukturze, oczywiście uzupełniony odpowiednimi danymi z odpowiedzi serwisu `Weatherbit` lub danymi mock dla tego serwisu.

```javascript
const emptyWeatherObject = {
  lastObservationTime: null,
  location: {
    cityName: null,
    countryCode: null,
  },
  weather: {
    currentTemperature: null,
    minTemperature: null,
    maxTemperature: null,
    units: null,
    description: null,
    iconUrl: null,
  },
};
```

Jeśli jakaś dana, nie pojawi się w odpowiedzi z API, skorzystaj z metody `lodash.get` i przypisz do polo wartość `undefined`.

Jeśli zapytanie do serwera zwróci błąd, w odpowiedzi zwróć pusty obiekt pogody z pliku `/adapters/empty-weather-object.js`.

## Zadanie 10

Uzupełnij metodę `getWeather` w pliku `/adapters/open-weather-map-adapter.js` w taki sposób, aby zwracała obiekt o zadanej strukturze, oczywiście uzupełniony odpowiednimi danymi z odpowiedzi serwisu `OpenWeather Map` lub danymi mock dla tego serwisu.

Jeśli jakaś dana, nie pojawi się w odpowiedzi z API, skorzystaj z metody `lodash.get` i przypisz do polo wartość `undefined`.

Jeśli zapytanie do serwera zwróci błąd, w odpowiedzi zwróć pusty obiekt pogody z pliku `/adapters/empty-weather-object.js`.

## Zadanie 11

Uzupełnij metodę `getWeather` w pliku `/adapters/accu-weather-adapter.js` w taki sposób, aby zwracała obiekt o zadanej strukturze, oczywiście uzupełniony odpowiednimi danymi z odpowiedzi serwisu `AccuWeather` lub danymi mock dla tego serwisu.

Jeśli jakaś dana, nie pojawi się w odpowiedzi z API, skorzystaj z metody `lodash.get` i przypisz do polo wartość `undefined`.

Jeśli zapytanie do serwera zwróci błąd, w odpowiedzi zwróć pusty obiekt pogody z pliku `/adapters/empty-weather-object.js`.

## Zadanie 12

Otwórz plik `/routes/weather.js`. Tworzone są w nim obiekty serwisów w zależności od zmiennej środowiskowej - mock bądź prawdziwe zapytania do API. Tworzone są także obiekty wszystkich zaimplementowanych przez Ciebie adapterów. Jedyne co musisz tu zmienić, to uzależnić zmienną `locationSearch` od danych przychodzących w `query params`.

```javascript
const locationSearch = 'Warszawa'; // take it from request params
```

## Zadanie 13

W pliku `/weather/js/index.js` uzupełnij parametry funkcji `fetch` w taki sposób, aby w odpowiedzi na zapytanie przychodziły dane z węzła końcowego `GET /weather` dopracowanego w `Zadaniu 12`

## Zadania dodatkowe - powtórka

Jeśli starczy Ci czasu możesz także wykonać, proste zadania, z którymi spotkaliśmy się już przy okazji poprzednich ćwiczeń.

## Zadanie 1

Do projektu aplikacji serwerowej dodaj zewnętrzne middleware do logowania informacji o zapytaniach `morgan`. Przetestuj różne opcje i zdecyduj się na jedną z nich.

## Zadanie 2

Dodaj middleware obsługujące błędy dla całej aplikacji i osobną obsługę dla `Not Found`

## Zadanie 3

Pozwól aplikacji klienckiej tylko na 100 zapytań dziennie.

## Zadanie 4

Skompresuj każde z zapytań używając do tego modułu `compression`. Sprawdź odpowiednie nagłówki, aby zobaczyć czy dane obiektu `res` faktycznie są kompresowane.

## Zadanie 5

Dodaj mechanizm `CORS` do Twojej aplikacji.
